import expensesApi from "../../services/expensesApi.js";

const Home = {
  allowAccess: async () => true,
  render: async () => {
    const summary = await expensesApi.getTotals();
    const view = /*html*/ `
        <script src="https://accounts.google.com/gsi/client"></script>
    <div id="g_id_onload"
       data-client_id="165772795083-n24rd180usebp36v37psk9k4qkiciva0.apps.googleusercontent.com"
       data-login_uri="${window.env.API_URL}/login"
       data-prompt_parent_id="g_id_onload"
       style="position: absolute; top: 150px; right: 530px; width: 0; height: 0; z-index: 1001;">
    </div>
    <h1>Home Page</h1>
    <p id="user-greet">Hello, ${window.user.name}</p>
    <p>So far, this app has been used to manage:</p>
    <div id="summary">
    <ul>
      <li><strong id="expenses-count">${summary.count}</strong> expenses</li>
      <li>$<strong id="expenses-total">
      ${summary.total.toFixed(2)}
      </strong> dollars</li>
    </ul>
    </div>    
    `;
    return view;
  },
  postRender: async () => {},
};

export default Home;
