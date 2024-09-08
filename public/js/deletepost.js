
  
  const deletePostFormHandler = async (event) => {
    event.preventDefault();
    console.log("delete post");
  
    const name = document.querySelector('#title').value.trim();
    const description = document.querySelector('#content').value.trim();
    const id = document.querySelector('#id').value.trim();
  
    if (name && description) {
      const response = await fetch(`/dashboard/post/${id}`, {
        method: 'DELETE',
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
    .querySelector('.deleteBlogPost')
    .addEventListener('click', deletePostFormHandler);
  