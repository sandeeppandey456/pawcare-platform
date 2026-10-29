// ==========================================
// PAWCARE - Client-Side Hash Router
// ==========================================

const routes = {};
let currentRoute = null;

export function registerRoute(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  if (window.location.hash === '#' + path) {
    window.dispatchEvent(new Event('hashchange'));
  } else {
    window.location.hash = path;
  }
}

export function getCurrentRoute() {
  return window.location.hash.slice(1) || '/';
}

export function startRouter(onRouteChange) {
  function handleRoute() {
    const path = getCurrentRoute();
    const basePath = path.split('?')[0];
    
    // Find matching route
    let handler = routes[basePath];
    let params = {};
    
    if (!handler) {
      // Try pattern matching (e.g., /product/:id)
      for (const [routePath, routeHandler] of Object.entries(routes)) {
        const routeParts = routePath.split('/');
        const pathParts = basePath.split('/');
        
        if (routeParts.length === pathParts.length) {
          let match = true;
          const tempParams = {};
          
          for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(':')) {
              tempParams[routeParts[i].slice(1)] = pathParts[i];
            } else if (routeParts[i] !== pathParts[i]) {
              match = false;
              break;
            }
          }
          
          if (match) {
            handler = routeHandler;
            params = tempParams;
            break;
          }
        }
      }
    }
    
    // Parse query params
    const queryString = path.split('?')[1];
    if (queryString) {
      queryString.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        params[key] = decodeURIComponent(value || '');
      });
    }
    
    if (handler) {
      currentRoute = basePath;
      if (onRouteChange) onRouteChange(basePath);
      handler(params);
    } else {
      // 404 - redirect to home
      navigate('/');
    }
  }
  
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

export function getQueryParams() {
  const path = getCurrentRoute();
  const params = {};
  const queryString = path.split('?')[1];
  if (queryString) {
    queryString.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      params[key] = decodeURIComponent(value || '');
    });
  }
  return params;
}
