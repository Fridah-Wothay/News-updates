
const apiKey = "8c0f81969a5b4d27b9f39aadfd60c9ca";
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

async function fetchNews() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("the response==>", data);
    displayNews(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}
function displayNews(articles) {
  const newsContainer = document.getElementById("news-articles");
  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    const articleElement = document.createElement("div");
    articleElement.classList.add("article");
    if (article.urlToImage) {
      const image = document.createElement("img");
      image.src = article.urlToImage;
      image.alt = article.title;
      articleElement.appendChild(image);
    }else{
      const alternativeImage=document.createElement('img');
      alternativeImage.src = "https://cdn.pixabay.com/photo/2016/02/01/00/56/news-1172463_640.jpg"
      alternativeImage.alt = article.title;
      articleElement.appendChild(alternativeImage)
   
    }
    function titleCase(str) {
      return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }
    const title = document.createElement("h2");
    title.textContent = titleCase(article.title.toLowerCase().substring(0, 20) + (article.title.length > 20 ? '...' : ''));
    articleElement.appendChild(title);
    const description = document.createElement("p");

    description.textContent = _.truncate(article.description, {
      length:10,
      omission:'...'

    })
    articleElement.appendChild(description);
    const url = document.createElement("a");
    url.href = article.url;
    url.textContent = "Read more";
    url.target = "_blank";
    url.style.float = "center";
    url.className = "read more"
    articleElement.appendChild(url);
    newsContainer.appendChild(articleElement);
  });
}
fetchNews();
