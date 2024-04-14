const express = require('express')
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const mysql = require('mysql2');
const { uuid } = require('uuidv4');
const Anthropic = require('@anthropic-ai/sdk');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));

let msg = "";
let crop1 = "", crop2 = "";


const connection = mysql.createConnection({
  host: 'bnwcrsaywao89zzbuqnm-mysql.services.clever-cloud.com',
  user: 'u33a0sks532sq8zq',
  database: 'bnwcrsaywao89zzbuqnm',
  password : process.env.MYSQL_PASS
});



const anthropic = new Anthropic({
    apiKey: process.env.API_KEY // This is the default and can be omitted
    });

async function answer(ques) {
    const message = await anthropic.messages.create({
    max_tokens: 1024,
    messages: [{ role: 'user', content: ques }],
    model: 'claude-3-opus-20240229',
});



// console.log(message.content[0].text)
return message.content[0].text;
    
}

app.get("/",(req,res)=>{
  res.render("index.ejs")
})


app.get("/about",(req,res)=>{
  res.render("about.ejs")
})


app.get("/contact",(req,res)=>{
  res.render("contact.ejs")
})

app.get("/farmer/:farmerId",async (req,res)=>{
  let farm_id = req.params.farmerId;

  let q1 = `SELECT * FROM farmOrder${farm_id}`
  let result1 = await new Promise((resolve,reject)=>{
    connection.query(q1,(err,result)=>{
      if(err) throw err;
      resolve(result)
    })
  })

  let q2 = `SELECT * FROM farmer${farm_id}`
  let result2 = await new Promise((resolve,reject)=>{
    connection.query(q2,(err,result)=>{
      if(err) throw err;
      resolve(result)
    })
  })

  // console.log(result2)

  
  
  // console.log(farm_id);
  let q = `SELECT * FROM farmer_info WHERE farm_id = "${farm_id}"`
  connection.query(q,(err,result)=>{
    if(err) throw err;
    // console.log(result);
    res.render("farmer.ejs", {result,result1,result2, msg});
    if(msg != "" || msg != " ") {
      msg = "";
  }
  })
  
})

app.post("/ans/:farm_id", (req,res)=>{

  let farm_id = req.params.farm_id;
  const {searchbox}  = req.body;

  answer(`${searchbox}`) 
  .then((resp)=>{
    msg = resp;
    res.redirect(`/farmer/${farm_id}`)
  })
  .catch((resp)=>{
    console.log(resp)
    msg = "Something went wrong" + resp
  })


})

app.delete("/delete/:farm_id/:crop_id",(req,res)=>{
  let crop_id = req.params.crop_id;
  let farm_id = req.params.farm_id;
  // console.log(farm_id)
  let q = `DELETE FROM farmer${farm_id} where crop_id = "${crop_id}"`

  connection.query(q,(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.redirect(`/crops/${farm_id}`)
  })
})



app.delete("/delete_order/:farm_id/:product_id",(req,res)=>{
  let product_id = req.params.product_id;
  let farm_id = req.params.farm_id;
  // console.log(farm_id)
  let q = `DELETE FROM farmOrder${farm_id} WHERE product_id = "${product_id}"`

  connection.query(q,(err,result)=>{
    if(err) throw err;
    // console.log(result);
    res.redirect(`/farmer/${farm_id}`)
  })
})

app.listen(3000,()=>{
  console.log("Port started at 3000")
})

app.get("/register",(req,res)=>{
  res.render("farmer_reg.ejs");
})

app.post("/register", (req,res)=>{
  let farmerId = uuid().slice(0,8);

  let q1 = `INSERT INTO farmer_info (farm_id,farm_name,mobile) VALUES ("${farmerId}", "${req.body.name}", "${req.body.number}");`

  connection.query(q1,(err,result)=>{
      if(err) throw err;
      console.log(result);
      // res.redirect("/admin");
  })

  let q2 = `CREATE TABLE farmer${farmerId} (crop_id varchar(100) PRIMARY KEY,crop_name varchar(100),quantity int,ppk int,farm_id varchar(100) default "${farmerId}") `

  connection.query(q2,(err,result)=>{
      if(err) throw err;
      console.log(result);
      // res.redirect(`/farmer/${farmerId}`)
  })

  let q3 = `CREATE TABLE farmOrder${farmerId} (product_id varchar(100) PRIMARY KEY,consumer_name varchar(100),crop_name varchar(100),quantity int,amount int,status varchar(100),farm_id varchar(100) default "${farmerId}") `

  connection.query(q3,(err,result)=>{
      if(err) throw err;
      console.log(result);
      res.redirect(`/farmer/${farmerId}`)
  })

})

app.get("/login", (req,res)=>{
  res.render("farmer_login.ejs");
})

app.post("/login",(req,res)=>{
  let isValid = false;
  let number = req.body.number;

  let q = `SELECT * FROM farmer_info`

  connection.query(q, (err,result)=>{
      if(err) throw err;
      console.log(number)
      
      for(let i=0;i<result.length;i++) {
        
        console.log(result[i].mobile)
          if(result[i].mobile === Number(number)) {
                      isValid = true;
                      res.redirect(`farmer/${result[i].farm_id}`);
          }
      }
      if(isValid == false) {
          res.send("Wrong credentials");
      }
      
      
  })

  // res.send("Authorised");
})

app.get(`/sell/:farm_id`,(req,res)=>{
  let farm_id = req.params.farm_id;
  console.log(farm_id)
  res.render("sell.ejs",{farm_id})
})

app.post(`/sell/:farm_id`,(req,res)=>{
  let farm_id = req.params.farm_id;
  console.log(req.body)
  let q = `INSERT INTO farmer${farm_id} (crop_id,crop_name, quantity,ppk) VALUES ("${uuid()}", "${req.body.crop_name}", ${Number(req.body.quantity)}, ${Number(req.body.ppk)})`

  connection.query(q,(err,res)=>{
    if(err) throw err;
    console.log(res);
  })
  res.redirect(`/crops/${farm_id}`)
})

app.get(`/crops/:farm_id`,(req,res)=>{
  let farm_id = req.params.farm_id;
  let q = `SELECT * FROM farmer${farm_id}`

  try {
    connection.query(q,(err,result)=>{
      if(err) throw err;
      console.log(result);
      res.render("crops.ejs", {result, farm_id})
    })
  } catch (error) {
    res.send("Please add some crops");
  }
  
})

app.get("/user",async (req,res)=>{
  let result = [];

        let q1 = `SELECT farm_id,farm_name FROM farmer_info`;

        const result1 = await new Promise((resolve, reject) => {
            connection.query(q1, (err1, result1) => {
                if (err1) reject(err1);
                resolve(result1);
            });
        });

        // console.log(result1);

        for (let i = 0; i < result1.length; i++) {
            let q2 = `SELECT * FROM farmer${result1[i].farm_id}`;
            const result2 = await new Promise((resolve, reject) => {
                connection.query(q2, (err2, result2) => {
                    if (err2) reject(err2);
                    resolve(result2);
                });
            });
            // console.log(result2)
            result2.forEach(res => {
                result.push(res);
                res.farm_name = result1[i].farm_name;
            });
        }

        // console.log(result)
        res.render("user.ejs",{result})
})

app.post("/compare",async (req,res)=>{
  // console.log(req.body);

  let q1 = `SELECT * FROM farmer_info`;

        const result1 = await new Promise((resolve, reject) => {
            connection.query(q1, (err1, result1) => {
                if (err1) reject(err1);
                resolve(result1);
            });
        });

  for(i=0;i<result1.length;i++) {
    let q2 = `SELECT * FROM farmer${result1[i].farm_id}`;
            const result2 = await new Promise((resolve, reject) => {
                connection.query(q2, (err2, result2) => {
                    if (err2) reject(err2);
                    resolve(result2);
                });
            });

            // console.log(result2)

            for(let i = 0;i<result2.length;i++) {
              if(result2[i].crop_id  == req.body.crop1) {
                console.log("true");
                crop1 = result2[i];
              } else{
                // console.log("false")
              }
            }
  }

  for(i=0;i<result1.length;i++) {
    let q3 = `SELECT * FROM farmer${result1[i].farm_id}`;
            const result3 = await new Promise((resolve, reject) => {
                connection.query(q3, (err2, result2) => {
                    if (err2) reject(err2);
                    resolve(result2);
                });
            });

            // console.log(result2)

            for(let i = 0;i<result3.length;i++) {
              if(result3[i].crop_id  == req.body.crop2) {
                console.log("true");
                crop2 = result3[i];
              } else{
                // console.log("false")
              }
            }
  }

  console.log(crop1)
  console.log(crop2)
  
  // console.log()
  res.redirect("/compare")
})

app.get("/compare", async (req,res)=>{
  let result = [];

        let q1 = `SELECT farm_id,farm_name FROM farmer_info`;

        const result1 = await new Promise((resolve, reject) => {
            connection.query(q1, (err1, result1) => {
                if (err1) reject(err1);
                resolve(result1);
            });
        });

        // console.log(result1);

        for (let i = 0; i < result1.length; i++) {
            let q2 = `SELECT * FROM farmer${result1[i].farm_id}`;
            const result2 = await new Promise((resolve, reject) => {
                connection.query(q2, (err2, result2) => {
                    if (err2) reject(err2);
                    resolve(result2);
                });
            });
            // console.log(result2)
            result2.forEach(res => {
                result.push(res);
                res.farm_name = result1[i].farm_name;
            });
        }

        // console.log(result)


  res.render("compare.ejs", {result, crop1,crop2});

  crop1 = "";
  crop2 = "";
})

app.post("/buy/:farm_id/:crop_id",async (req,res)=>{
  let crop_id = req.params.crop_id;
  let farm_id = req.params.farm_id;

  console.log(farm_id)

  let q1 = `SELECT * FROM farmer${farm_id} WHERE crop_id = "${crop_id}"`

  const result1 = await new Promise((resolve,reject)=>{
    connection.query(q1,(err,result)=>{
      if(err) throw err;
      resolve(result);
    })
  })

  console.log(result1)
  let q2 = `INSERT INTO farmOrder${farm_id} VALUES ("${uuid()}", "Vasu Choudhari", "${result1[0].crop_name}",${Number(result1[0].quantity)}, ${Number(result1[0].quantity) * Number(result1[0].ppk)}, "Status", "${farm_id}")`
  connection.query(q2,(err,result)=>{
    if(err) throw err
    console.log(result);  

    res.redirect(`/user`)
  })

})