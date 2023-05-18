import proxy from "http-proxy-middleware";
export default function(app) {
  app.use(proxy("/api/**", { // https://github.com/chimurai/http-proxy-middleware
    target: "http://localhost:8800",
    secure: false
  }));
};