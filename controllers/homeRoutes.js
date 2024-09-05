const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    // const usernames = await User.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['username'],
    //     },
    //   ],
    // });

    // Serialize data so the template can read it
    // const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('home', {
      logged_in: req.session.logged_in

    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/dashboard', async (req, res) => {
  // console.log(req.session.logged_in)

  const dbBlogPosts = await BlogPost.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    const BlogPosts = dbBlogPosts.map((gallery) =>
      gallery.get({ plain: true })
    );

  if (req.session.logged_in == undefined) {
    res.redirect('/login');
    return;
  }

  res.render('dashboard',
    {
      BlogPosts,
      newpost: false,
      logged_in: req.session.logged_in

    }
  );
});

router.get('/dashboard/new', (req, res) => {
  console.log(req.session.logged_in)
  if (req.session.logged_in == undefined) {
    res.redirect('/login');
    return;
  }

  res.render('newPost',
    {
      newpost: true,
      logged_in: req.session.logged_in

    }
  );
});


router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  // console.log(req.session.logged_in)
  // if (req.session.logged_in == undefined) {
  //   res.redirect('/login');
  //   return;
  // }

  res.render('signup');
});

module.exports = router;
