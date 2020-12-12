const path = require("path");

const authController = {
  login(req: any, res: any) {},
  google(req: any, res: any) {
    res.send("Logging in with Google");
  },
  logout(req: any, res: any) {
    res.send("Logging out");
  },
};
