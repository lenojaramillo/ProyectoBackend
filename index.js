import express from 'express'
import cors from 'cors'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, setDoc, addDoc, deleteDoc, doc}  from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCOtajlR4gWLghn_k6K4QkiOilm3Bdulpc",
    authDomain: "satm-proyecto-backfront.firebaseapp.com",
    projectId: "satm-proyecto-backfront",
    storageBucket: "satm-proyecto-backfront.appspot.com",
    messagingSenderId: "459208635120",
    appId: "1:459208635120:web:ddd463efc34702743dc835"
  };

  const firebase = initializeApp(firebaseConfig)
  const db = getFirestore(firebase)

//settings de la aplicacion
const app = express()
app.use(express.json())
app.use(cors())

// Creacion de rutas
app.get('/', async (req, res) =>{
    try{
        const Users= await collection(db, 'Users')
        const listUsers = await getDocs (Users)
        const aux= []
        listUsers.forEach((doc) =>{
            const obj = {
            id: doc.id,
            ...doc.data()
            }
            aux.push(obj)
        })
        res.send({
            'msg' : 'success',
            'data' : aux
        })
    }   catch{
        res.send({
            'msg' : 'error',
            'data' : error
        })
    }
})

app.post('/create', async (req, res)=>{
    try{
        const body= req.body
        const Users = await collection(db, 'Users')
        await addDoc(Users, body)
        res.send({
            'msg': 'success'
        })
    } catch (error){
        res.send({
            'msg' : 'error',
            'data' : error
        })
    }
})

app.get('/delete/:id',async(req, res) => {
    console.log('@@@ param => ', req.params.id)
    const id = req.params.id
    try {
        await deleteDoc(doc(db, 'Users', id))
        res.send({
            'msg':'user deleted'
        })
    } catch (error){
        res.send({
            'msg': 'error',
            'data' : error
        })
    }       
    //const userDeleted = await deleteDoc(doc(db, 'Users', id))
})

app.get('/get-update/:id', async (req, res) => {
    const id = req.params.id

    const userRef = doc(db, 'Users', id)
    const user = await getDoc(userRef)

    if(user.exist()){
        res.send({
            'msg': 'success',
            'data': user.data()
        })
    } else{
        res.send({
            'msg': 'uset doesnt exist'
        })
    }
})

// Prendemos el servidor
app.listen(9000, () =>{
    console.log('servidor trabajando')  
})