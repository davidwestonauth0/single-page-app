
// default user
window.user = {
  name: "Anonymous",
  picture: profile,
};

const OneTap = {
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

    `;

    return view;
  },
};

export default OneTap;
