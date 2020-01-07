export default async function(context) {
    // 手机跳转
    if (context.req && context.req.headers) {
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(context.req.headers["user-agent"])) {
            return context.redirect("http://uat.m.maijimeng.com");
        }
    }
}