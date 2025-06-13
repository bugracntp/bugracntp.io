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

  // Kaç proje görünsün?
  const visibleCount = 6;

  for (let i = 0; i < repos.length; i++) {
    const repo = repos[i];
    // Proje kutusu
    const boxDiv = document.createElement("div");
    boxDiv.className = "box tilt";
    if (i >= visibleCount) boxDiv.classList.add("hidden-project");

    // İçerik
    const contentDiv = document.createElement("div");
    contentDiv.className = "content";

    // Tag (Başlık)
    const tagDiv = document.createElement("div");
    tagDiv.className = "tag";
    const a = document.createElement("a");
    a.href = repo.url;
    a.target = "_blank";
    const h3 = document.createElement("h3");
    h3.textContent = repo.name;
    a.appendChild(h3);
    tagDiv.appendChild(a);
    contentDiv.appendChild(tagDiv);

    // Açıklama ve dil için gri alan
    const descArea = document.createElement("div");
    descArea.className = "desc-area";
    if (repo.des) {
      const p = document.createElement("p");
      p.className = "desc";
      p.textContent = repo.des;
      descArea.appendChild(p);
    }
    if (repo.lan) {
      const span = document.createElement("span");
      span.className = "language";
      span.textContent = repo.lan;
      descArea.appendChild(span);
    }
    contentDiv.appendChild(descArea);

    boxDiv.appendChild(contentDiv);
    projectlist.appendChild(boxDiv);
  }

  // View All butonu ekle
  if (repos.length > visibleCount) {
    const viewAllDiv = document.createElement("div");
    viewAllDiv.className = "viewall";
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.innerHTML = '<span>Tümünü Gör</span> <i class="fas fa-arrow-right"></i>';
    btn.onclick = function() {
      document.querySelectorAll('.hidden-project').forEach(el => {
        el.classList.remove('hidden-project');
      });
      viewAllDiv.style.display = 'none';
      
      // Daha Az Göster butonu ekle
      const showLessDiv = document.createElement("div");
      showLessDiv.className = "viewall";
      const showLessBtn = document.createElement("button");
      showLessBtn.className = "btn";
      showLessBtn.innerHTML = '<span>Daha Az Göster</span> <i class="fas fa-arrow-up"></i>';
      showLessBtn.onclick = function() {
        for (let i = visibleCount; i < repos.length; i++) {
          document.querySelectorAll('.box')[i].classList.add('hidden-project');
        }
        showLessDiv.style.display = 'none';
        viewAllDiv.style.display = 'block';
      };
      showLessDiv.appendChild(showLessBtn);
      projectlist.parentNode.appendChild(showLessDiv);
    };
    viewAllDiv.appendChild(btn);
    projectlist.parentNode.appendChild(viewAllDiv);
  }

  // Tilt efektini yeniden başlat
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
  }
})();
