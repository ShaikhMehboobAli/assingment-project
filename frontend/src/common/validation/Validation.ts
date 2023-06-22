const checkValidation = (fieldValue: any, type?: any) => {
  if (fieldValue == null || fieldValue === undefined || fieldValue === "") {
    return false;
  }
  let r = /^[a-zA-Z0-9. ]+$/;
  let e =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let dob = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/


  if (type === "email") {
    return e.test(fieldValue);
  }

  // -------------- indian num check --------------

  if (type === "num" && fieldValue.length === 10) {
    return true;
  } else if (
    type === "num" &&
    (fieldValue.length > 10 || fieldValue.length < 10)
  ) {
    return false;
  }



  if(type === 'dob'){
    return dob.test(fieldValue)
  }
  return r.test(fieldValue);
};

export { checkValidation };
