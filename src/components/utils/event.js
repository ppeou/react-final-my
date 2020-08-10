
const onclickGenerator = (myInput) => {
  return (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    if (myInput.current) {
      console.log('id', id);
      const event = new CustomEvent('click', {detail: {id}, bubbles: true, cancelable: true});
      console.log(myInput.current);
      myInput.current.dispatchEvent(event);
    }
  };
};

export {onclickGenerator};