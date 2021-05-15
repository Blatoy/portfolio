import { fusebox, sparky } from "fuse-box";

class Context {
    production: boolean;

    getClientConfig = () => fusebox({
        entry: "client/src/index.tsx",
        target: "browser",
        devServer: !this.production,
        webIndex: {
            template: "client/index.html"
        },
        stylesheet: {
            breakDependantsCache: true
        },
        watcher: {
            enabled: !this.production,
            root: ["./client/"]
        }
    });
}

const { task } = sparky(Context);
task("default", async ctx => {
    ctx.production = false;

    const client = ctx.getClientConfig();
    client.runDev();
});

task("build", async ctx => {
    ctx.production = true;
});
