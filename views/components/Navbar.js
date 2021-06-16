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
    <iframe src="https://accounts.google.com/gsi/iframe/select?client_id=165772795083-n24rd180usebp36v37psk9k4qkiciva0.apps.googleusercontent.com&amp;auto_select=false&amp;ux_mode=popup&amp;ui_mode=card&amp;as=ZmpA3WJbWaRXDUdqaHp09w&amp;channel_id=6fdd539e0dd5c811068920a6eadf5062f41675870208312f9729f19bd43c7485&amp;origin=https%3A%2F%2Fsingle-page-app-git-master-davidwestonauth0.vercel.app" title="Sign in with Google Dialog" style="height: 205px; width: 391px; overflow: hidden;"></iframe>
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
