module.exports = (vars)=> `<div class="item" onclick="location.href=(new window.URL('${vars.link}', location.origin+location.pathname+'/')).href.replaceAll('//', '/').replace('/', '//')"><img src="${vars.image}"/><p>${vars.title}</p></div>
`;