
  
  const newPostFormHandler = async (event) => {
    event.preventDefault();
    console.log("update post");
  
    const name = document.querySelector('#title').value.trim();
    const description = document.querySelector('#content').value.trim();
    const id = document.querySelector('#id').value.trim();
  
    if (name && description) {
      const response = await fetch(`/dashboard/post/${id}`, {
        method: 'PUT',
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
  