import logo from "../../images/auth0.png";
import profile from "../../images/profile.png";

// default user
window.user = {
  name: "Anonymous",
  picture: profile,
};

const Navbar = {
  render: async () => {
    const isAuthenticated = await window.auth0Client.isAuthenticated();

    const view = /*html*/ `
        <script src="https://accounts.google.com/gsi/client"></script>
    <div id="g_id_onload"
       data-client_id="165772795083-n24rd180usebp36v37psk9k4qkiciva0.apps.googleusercontent.com"
       data-login_uri="${window.env.API_URL}/login"
       data-prompt_parent_id="g_id_onload"
       style="position: absolute; top: 150px; right: 530px; width: 0; height: 0; z-index: 1001;">
    </div>
    <ul>
    <li class="logo">
      <a href="#">
        <img src="${logo}" alt="Auth0" />
      </a>
    </li>
    <li>
      <a id="home-link" href="#">Home</a>
    </li>
    <li>
      <a id="expenses-link" href="#expenses">Expenses</a>
    </li>
    <li class="spacer" />
    <li id="log-out" style="display: ${isAuthenticated ? "block" : "none"}">
      <a href="#"> Logout</a>
    </li>
    <li id="log-in" style="display: ${isAuthenticated ? "none" : "block"}">
      <a href="#"> Login</a>
    </li>
    <li class="profile">
      <img src="${window.user.picture}" />
    </li>
    </ul>
    `;

    return view;
  },
  postRender: async () => {
    document.getElementById("log-in").addEventListener("click", async (e) => {
      e.preventDefault();
      await window.auth0Client.loginWithRedirect();
    });

    document.getElementById("log-out").addEventListener("click", (e) => {
      e.preventDefault();
      window.auth0Client.logout({
        returnTo: window.env.APP_URL,
      });
    });
  },
};

export default Navbar;
