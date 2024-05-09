const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Resumemodel = require('./model/resumemodel');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/resumebase')
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/image');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.get('/getdatas', (req, res) => {
    Resumemodel.find()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Failed to fetch data' });
        });
});
app.get('/getdatasId/:id', async (req, res) => {
    try {
        const user = await Resumemodel.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (err) {
        console.log('getserver/:id error:', err.message);
        res.status(500).send({ error: 'Server error' });
    }
});


app.post('/postdatas', upload.single('photo'), (req, res) => {
    const { name, place, email, phone, education, address, city, state, zip, skills, experiences } = req.body;
    const photo = req.file ? req.file.filename : null;
    const resume = new Resumemodel({ name, photo, place, email, phone, education, address, city, state, zip, skills, experiences });
    resume.save()
        .then(() => {
            res.json({ message: 'Data saved successfully' });
        })
        .catch((error) => {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Failed to save data' });
        });
});


app.put('/update/:id', upload.single('photo'), async (req, res) => {
    try {
        // Get the resume document by ID
        let resume = await Resumemodel.findById(req.params.id);
        if (!resume) {
            return res.status(404).send({ error: 'Resume not found' });
        }

        for (const key in req.body) {
            if (key !== 'photo') {
                resume[key] = req.body[key];
            }
        }

        if (req.file) {
            resume.photo = req.file.filename;
        }

        resume = await resume.save();

        res.send(resume);
    } catch (error) {
        console.error('Error updating resume:', error.message);
        res.status(500).send({ error: 'Server error' });
    }
});


app.delete('/deletedata/:id', (req, res) => {
    const { id } = req.params;
    Resumemodel.findByIdAndDelete(id)
        .then(() => {
            res.json({ message: 'Data deleted successfully' });
        })
        .catch((error) => {
            console.error('Error deleting data:', error);
            res.status(500).json({ error: 'Failed to delete data' });
        });
});

app.listen(PORT, () => {
    console.log('Server Started', PORT);
});
