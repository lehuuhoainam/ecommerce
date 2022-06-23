const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()
const port = 3001
const router = require("./src/router")
const dbConn = require("./db")

const { FE_ORIGIN } = process.env

app.use(cors({ origin: FE_ORIGIN, credentials: true }))
app.use(cookieParser())
app.use(express.json())
app.use("/api", router)

dbConn.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack)
    return
  }

  console.log("connected as id " + dbConn.threadId)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
