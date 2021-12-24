const projectlist = document.querySelector("#projects-list");
let repos = [];
console.log("run");
(async () => {
  const repApi = await fetch(
    "https://api.github.com/users/bugracntp/repos"
  ).then((response) => response.json());
  repos = repApi.map((repo) => {
    return {
      name: repo.name,
      des: repo.description,
      url: repo.html_url,
      lan: repo.language,
    };
  });

  for (let i = 0; i < repos.length; i++) {
    const repo = repos[i];
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";

    const aTag = document.createElement("a");
    aTag.setAttribute("href", repo.url);

    const divContent = document.createElement("div");
    divContent.className = "col-content";
    if (repo.lan !== "null") {
      divContent.innerHTML = `<h3 class="col-title">${repo.name}</h3>
                          <p class="des">${repo.des}</p>
                          <span class="language">${repo.lan}</span>`;
    } else {
      divContent.innerHTML = `<h3 class="col-title">${repo.name}</h3>
        <p class="des">${repo.des}</p>
        <span class="language"></span>`;
    }

    aTag.appendChild(divContent);
    projectDiv.appendChild(aTag);
    projectlist.appendChild(projectDiv);
  }
})();
