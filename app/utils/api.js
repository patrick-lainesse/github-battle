export function fetchPopularRepos(language) {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    return fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
            if (!data.items) {
                /* No error catching since we can't do anything concerning the user relatively to this error
                   Instead, we can catch the error when invoking fetchPopularRepos (and/or in the UI layer) */
                throw new Error(data.message)
            }

            return data.items
        })
}