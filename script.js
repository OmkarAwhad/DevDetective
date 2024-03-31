const searhForm = document.querySelector('[data-searchForm]');

let searchBtn = document.querySelector('[data-searchBtn]')
let searchInput = document.querySelector('[data-searchInput]');
let apiURL = 'https://api.github.com/users/'

let cross = document.querySelector('#cross')

cross.addEventListener('click',()=>{
    searchInput.value = '';
    cross.classList.remove('active');
})

searchBtn.addEventListener('click',()=>{
    if(searchInput.value.trim() !== ""){
        fetchData(apiURL + searchInput.value);
        cross.classList.add('active');
    }else{
        cross.classList.remove('active');
    }
})

searchInput.addEventListener('keydown',(e)=>{
    cross.classList.add('active')
    if(e.key === "Enter"){
        if(searchInput.value !== ""){
            fetchData(apiURL + searchInput.value);
        }
    }
})


async function fetchData(gitURL){
    try{
        const response = await fetch(gitURL)
        const data = await response.json();

        renderData(data);
    }catch(e){
        console.log("Error occured");
    }
}

function renderData(userInfo){
    const userPhoto = document.querySelector('[data-userPhoto]')
    const name = document.querySelector('[data-name]')
    const userJoined = document.querySelector('[data-joined]')
    const userNameUrl = document.querySelector('[data-userNameUrl]')
    const userNameUrlnothing = document.querySelector('[data-userNameUrlnothing]')
    const userBio = document.querySelector('[data-bio]')
    const data_repos = document.querySelector('[data-repos]')
    const data_followers = document.querySelector('[data-followers]')
    const data_following = document.querySelector('[data-following]')
    const data_location = document.querySelector('[data-location]')
    const data_youtube = document.querySelector('[data-youtube]')
    const data_twitter = document.querySelector('[data-twitter]')
    const data_address = document.querySelector('[data-address]')


    function checkNull(apiItem, domItem) {
        if (apiItem === "" || apiItem === null) {
            return false;
        }else {
            return true;
        }
    }

    userPhoto.src = `${userInfo?.avatar_url}`;
    name.innerText = userInfo?.login;
    userJoined.innerText = `Joined ${formatDate(userInfo?.created_at)}` || 'Not available';
    userNameUrl.href = userInfo?.html_url;
    userNameUrlnothing.innerHTML = userInfo?.login;
    userBio.innerText = userInfo?.bio || "This profile has no bio";
    data_repos.innerText = userInfo?.public_repos;
    data_followers.innerText = userInfo?.followers;
    data_following.innerText = userInfo?.following;
    data_location.innerText = userInfo?.location || "Not Available";

    data_youtube.href = checkNull(userInfo?.blog, data_youtube) ? userInfo?.blog : "#";

    data_youtube.innerHTML = checkNull(userInfo?.blog, data_youtube) ? "Youtube": "Not Available";

    data_twitter.innerHTML = checkNull(userInfo?.twitter_username, data_twitter) ? userInfo?.twitter_username : "Not Available";
    
    data_twitter.href = checkNull(userInfo?.twitter_username, data_twitter) ? `https://twitter.com/${userInfo?.twitter_username}` : "#";

    data_address.innerText = userInfo?.company || "Not Available";
    
}

function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
}

let darkModeBtn = document.querySelector('[data-darkLight]')
let lightText = document.querySelector('[data-blacknWhite]')
let lightTextIcon = document.querySelector('[data-blacknWhiteIcon]')
let darkMode = false;

darkModeBtn.addEventListener('click',()=>{
    if(darkMode === false ){
        enableDark()
    }else{
        enableLight();
    }
})

function enableDark(){
    document.documentElement.style.setProperty("--lm-bg","#141D2F")
    document.documentElement.style.setProperty("--lm-bg-content","#1E2A47")
    document.documentElement.style.setProperty("--lm-text","white")
    document.documentElement.style.setProperty("--lm-text-alt","white")
    document.documentElement.style.setProperty("--lm-shadow","")
    document.documentElement.style.setProperty("--lm-shadow-inactive","")
    document.documentElement.style.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)")

    lightText.innerText = "LIGHT"    
    lightTextIcon.src = "./images/sun-icon.svg"

    darkMode = true;

}
function enableLight(){
    document.documentElement.style.setProperty("--lm-bg","#f6f8ff")
    document.documentElement.style.setProperty("--lm-bg-content","#fefefe")
    document.documentElement.style.setProperty("--lm-text","#4b6a9b")
    document.documentElement.style.setProperty("--lm-text-alt","2b3442")
    document.documentElement.style.setProperty("--lm-shadow","0px 16px 30px -10px rgba(70, 96, 187, 0.2)")
    document.documentElement.style.setProperty("--lm-shadow-inactive","0px 16px 30px -10px rgba(0, 0, 0, 0.2)")


    lightText.innerText = "DARK"
    lightTextIcon.src = "./images/moon-icon.svg"

    darkMode = false;
}


const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

// Check if there is a value for "dark-mode" in the user's localStorage
if (localStorage.getItem("dark-mode") === null) {
    // If there is no value for "dark-mode" in localStorage, check the device preference
    if (prefersDarkMode) {
        // If the device preference is for dark mode, apply dark mode properties
        enableDark();
    } else {
        // If the device preference is not for dark mode, apply light mode properties
        enableLight();
    }
} else {
    // If there is a value for "dark-mode" in localStorage, use that value instead of device preference
    if (localStorage.getItem("dark-mode") === "true") {
        // If the value is "true", apply dark mode properties
        enableDark();
    } else {
        // If the value is not "true", apply light mode properties
        enableLight();
    }
}






fetchData(apiURL + "lovebabbar");


