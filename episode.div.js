module.exports = (vars)=> `<a class="item" href="/${vars.programme}/${vars.series}/${vars.num}"><img src="${vars.image}"/><p>Ep${vars.num+1}: ${vars.title}</p></a>
`;