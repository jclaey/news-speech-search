const searchInput = document.querySelector('#search-input'),
      searchForm = document.querySelector('form'),
      microphone = document.querySelector('.microphone'),
      results = document.querySelector('#results');

const onFormSubmit = e => {
  e.preventDefault();

  fetch(`https://newsapi.org/v2/everything?q=${searchInput.value}`, {
    headers: {
      'X-Api-Key': 'eedecb9112994f30ac983ccbed7789cd'
    }
  })
    .then(res => res.json())
    .then(data => addToDOM(data));
};

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

const onMicClick = e => {
  microphone.classList.add('mic-on');
  recognition.start();
};

const onSpeechSubmit = e => {
  const msg = e.results[0][0].transcript;
  searchInput.value = msg.replace('.', '');

  fetch(`https://newsapi.org/v2/everything?q=${msg}`, {
    headers: {
      'X-Api-Key': 'eedecb9112994f30ac983ccbed7789cd'
    }
  })
    .then(res => res.json())
    .then(data => addToDOM(data));
};

const addToDOM = data => {
  results.innerHTML = '';

  for (let article of data.articles) {
    results.innerHTML += `
      <div class="article-item">
        <img src="${article.urlToImage}" class="ui large rounded image" />
        <h3>${article.title}</h3>
        <p>From: ${article.source.name}</p>
        <p>By: ${article.author}</p>
        <p><strong>${article.description}</strong></p>
        <a href="${article.url}" target="_blank" class="ui button">Link</a>
        <div class="ui divider"></div>
      </div>
    `;
  }
};

// Event listeners
searchForm.addEventListener('submit', onFormSubmit);
microphone.addEventListener('click', onMicClick);
recognition.addEventListener('result', onSpeechSubmit);
recognition.addEventListener('end', () => {
  microphone.classList.remove('mic-on');
});