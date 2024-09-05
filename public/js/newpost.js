
  
  const newPostFormHandler = async (event) => {
    event.preventDefault();
    console.log("new post");
  
    const name = document.querySelector('#title').value.trim();
    const description = document.querySelector('#content').value.trim();
  
    if (name && description) {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
    }
  };
  

  document
    .querySelector('.formBlogPost')
    .addEventListener('submit', newPostFormHandler);
  