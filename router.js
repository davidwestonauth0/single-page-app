import Error404 from "./views/pages/Error404";
import Home from "./views/pages/Home";
import Expenses from "./views/pages/Expenses";
import Navbar from "./views/components/Navbar";

const routes = {
  "/": Home,
  expenses: Expenses
};

const navbar = document.getElementById("navbar");
const content = document.getElementById("content");

const router = async () => {
  
  if (new URLSearchParams(window.location.search).has("code")) {
   await window.auth0Client.handleRedirectCallback();
   window.history.replaceState({}, document.title, "/");
  }
  const request = location.hash.slice(1).toLowerCase() || "/";

  console.log(request);
  
 // let div = document.createElement("<div id='test'></div>")
  

 // document.getElementsByTagName('body')[0].append(div);

  
  if (new URLSearchParams(window.location.search).has("onetap") || request=="login") {
    const urlParams = new URLSearchParams(window.location.search);
    var email = urlParams.get('email');
    const opts = {
      login_hint: email,
      connection: "google-oauth2"
    };
    await window.auth0Client.loginWithRedirect(opts);
    
  }

  if (await window.auth0Client.isAuthenticated()) {
   window.user = await window.auth0Client.getUser();
   if (document.getElementById("g_id_onload")!= null) {
      document.getElementById("g_id_onload").remove();
    }
  }

  
  const page = routes[request] || Error404;

  if (await page.allowAccess()) {
    content.innerHTML = await page.render();
    await page.postRender();
  } else {
    window.history.replaceState({}, document.title, "/");
  }

  navbar.innerHTML = await Navbar.render();
  await Navbar.postRender();
};

export default router;
