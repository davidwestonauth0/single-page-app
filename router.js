import Error404 from "./views/pages/Error404";
import Home from "./views/pages/Home";
import Expenses from "./views/pages/Expenses";
import Navbar from "./views/components/Navbar";
import OneTap from "./views/components/OneTap";

const routes = {
  "/": Home,
  expenses: Expenses
};

const navbar = document.getElementById("navbar");
const content = document.getElementById("content");
const onetap = document.getElementsByTagName('body')[0];

const router = async () => {
  
  if (new URLSearchParams(window.location.search).has("code")) {
   await window.auth0Client.handleRedirectCallback();
   window.history.replaceState({}, document.title, "/");
  }
  const request = location.hash.slice(1).toLowerCase() || "/";

  console.log(request);

  
  if (new URLSearchParams(window.location.search).has("onetap") || request=="login") {
    console.log("here");
    const opts = {
      login_hint: "davidweston.uk@googlemail.com",
      connection: "google-oauth2"
    };
    await window.auth0Client.loginWithRedirect(opts);
    
  }

  if (await window.auth0Client.isAuthenticated())
   window.user = await window.auth0Client.getUser();
  
  const page = routes[request] || Error404;

  if (await page.allowAccess()) {
    content.innerHTML = await page.render();
    await page.postRender();
  } else {
    window.history.replaceState({}, document.title, "/");
  }
  document.getElementsByTagName('body')[0].append('<div id="g_id_onload" data-client_id="165772795083-n24rd180usebp36v37psk9k4qkiciva0.apps.googleusercontent.com" data-login_uri="${window.env.API_URL}/login" data-prompt_parent_id="g_id_onload" style="position: absolute; top: 150px; right: 530px; width: 0; height: 0; z-index: 1001;"></div>');

  navbar.innerHTML = await Navbar.render();
  await Navbar.postRender();
  
};

export default router;
