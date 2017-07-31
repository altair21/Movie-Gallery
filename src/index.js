const _data = JSON.parse(data);

$().ready(() => {
  const triggerDistance = 200;
  const totalLen = _data.length;
  let curLen = 0;
  let isEnd = false;

  const appendToDOM = (id) => {
    $('#container').append(`<div class="card" id="card-${id}"></div>`);
    const width = $('#card-0').width();
    const imgSrc = _data[id].posterURL;
    const image = $('<img />');
    const placeholder = $('<div />')
      .css('background-color', _data[id].color || '#ffffff')
      .css('width', width)
      .css('height', (_data[id].h / _data[id].w) * width);
    $(`#card-${id}`).append(placeholder);
    image.attr('width', '100%').attr('src', imgSrc)
      .css('opacity', 0).css('display', 'block')
      .on('load', () => {
        image.animate({
          opacity: 1,
        }, 500);
        placeholder.animate({
          opacity: 0,
        }, 500, 'swing', () => {
          placeholder.remove();
        });
      });
    $(`#card-${id}`).append(image);
    if (id === totalLen) isEnd = true;
  };

  const fetchData = () => {
    const distance = $('#spinner')[0].getBoundingClientRect().bottom - window.innerHeight;
    if (!isEnd && distance < triggerDistance) {
      appendToDOM(curLen++);
    }
  };

  for (let i = 0; i < Math.min(50, _data.length); i++) {
    appendToDOM(curLen++);
  }

  window.addEventListener('scroll', fetchData);
});
