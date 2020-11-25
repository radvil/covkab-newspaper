export function makeStatsArray(obj) {
  let doc = [];
  let items = [
    { color: '#ff3333', link: '/patients-list' }, // positive
    { color: '#ffcc1a', link: '/patients-list' }, // pdp
    { color: '#25e61e', link: '/patients-list' }, // odp
    { color: '#1986df', link: '/patients-list' }, // otg
    { color: '#ffffff', link: '/articles-list' }, // articles
    { color: '#ffffff', link: '/slides-list' }, // portfolios
    { color: '#ffffff', link: '/patients-list' }, // patients
    { color: '#ffffff', link: '/users-list' }, // users
  ];
  let itemIndex = 0;

  for (let k in obj) {
    let first = k.toString().substring(0, 5);
    let second = k.toString().substring(5);
    let pre = first.substring(0, 1).toUpperCase() + first.substring(1);

    let label = pre + ' ' + second;

    doc.push({
      label,
      value: obj[k],
      color: items[itemIndex].color,
      link: items[itemIndex].link,
    });
    itemIndex++;
  }

  return doc;
}
