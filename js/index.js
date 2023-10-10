document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    console.log(form)
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formInput = e.target.search.value;
        searchUSer(formInput);
        form.reset()
    })
})

function searchUSer(name) {
    fetch(`https://api.github.com/search/users?q=${name}`)
    .then(response => response.json())
    .then(data => {
        let li = document.createElement("li");
        li.innerHTML = `
        <img src=${data.items[0].avatar_url} height="100" width="100">
        <h3>Profile Name: <em>${data.items[0].login}</em></h3>
        <p> Github link: <a href="${data.items[0].html_url}">Here's my profile link</a></p>
        `;
        li.querySelector("h3 em").addEventListener("click", (e) => {
            userNameDisplay = e.target.textContent
            fetch(`https://api.github.com/users/${userNameDisplay}/repos`)
            .then(response => response.json())
            .then(repos => {
                const repoList = document.createElement("table");
                repoList.innerHTML = `
                    <tr>
                        <th>My Repos</th>
                        <th>Links</th>
                    </tr>
                `;
                for (const repo of repos) {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${repo.name}</td>
                        <td><a href="${repo.html_url}">${repo.html_url}</a></td>
                    `;
                    repoList.appendChild(row);
                }
                document.querySelector("#repos-list").appendChild(repoList);
                
            })
        })
        document.querySelector("#user-list").appendChild(li);
    })
}