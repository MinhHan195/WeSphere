const app = require("./app");

//Tao function server

async function startServer() {
    try {
        const PORT = 5178;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Cannot connect to  the database!", error);
        process.exit();
    }
}

startServer();
//Chay server
