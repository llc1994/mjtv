export default async function(context) {
    if (context.store.state.session.isLogin !== true) {
        return context.redirect("/not-login");
    }
}
