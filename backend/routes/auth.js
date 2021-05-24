const { register, login, 
    getMe, forgotPassword, resetPassword, 
    updateDetails, updatePassword,
    uploadProfilePic, uploadCoverPic, getAllUsers, 
    getSingleUser } = require('../controllers/auth');
const {protect} = require('../middleware/auth');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.get('/users/:id', getSingleUser);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/uploadprofilepic', protect, uploadProfilePic);
router.post('/uploadcoverpic', protect, uploadCoverPic);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;