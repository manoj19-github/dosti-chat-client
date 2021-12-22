import React,{useState} from 'react'
import * as Yup from  "yup"
import {Formik,Form as MyForm,Field,ErrorMessage} from "formik"
import {
  VStack,
  StackDivider,
  Button
} from "@chakra-ui/react"
import {
  Input,InputGroup,
  InputRightElement,

}
from "@chakra-ui/input"
import {signupAction} from "../../redux/action/authAction/signupAction"
import {
  FormControl,FormLabel,
  FormErrorMessage
}from "@chakra-ui/form-control"
import {useToast} from "@chakra-ui/react"


const Signup = () => {
  const toast=useToast()

  const initFormData={
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
  }
  const validationSchema=Yup.object({
    name:Yup.string().trim().required("name is required"),
    email:Yup.string().trim().matches(/^[A-Za-z1-9_%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/i,"email not valid").required("email is required"),
    password:Yup.string().trim().min(4,"minimum 4 character required").max(20,"must be less than 20 character").required("password required"),
    confirmPassword:Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
  })
  const [show,setShow]=useState(false)
  const [show2,setShow2]=useState(false)
  const [pic,setPic]=useState(null)
  const handleClick=()=>{
    setShow(!show)
  }
  const handleClick2=()=>{
    setShow2(!show2)
  }

  const submitHandler=async(values,onSubmitProps)=>{
    if(values.password !== values.confirmPassword){
      alert("confirm password not matched ")
      return
    }
    let formVal={...values,pic}
    try{
      const data=await signupAction(formVal)    // network call
      onSubmitProps.resetForm()
      if(data.status){
        toast({
          title:`${data.message}`,
          status:"success",
          duration:6000,
          isClosable:true,
          position:"bottom"
        })
      }else{
        toast({
          title:`${data.message}`,
          status:"error",
          duration:6000,
          isClosable:true,
          position:"bottom"
        })
      }

    }catch(err){
      console.log(`signup err ${err}`)
      alert("something went wrong")

    }

  }
    return (
      <VStack
        spacing="5px"
        align='stretch'
        color="black"
        >
          <Formik
            initialValues={initFormData}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
            >
            {
              formik=>{
                return(
                  <MyForm>
                    <Field name="name">
                      {
                        ({field,form})=>(
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel>
                              Name
                            </FormLabel>
                            <Input
                                {...field}
                                id="name"
                                placeholder="Enter Your Name"
                              />
                            <FormErrorMessage  style={{margin:"14px 0"}}>{form.errors.name}</FormErrorMessage>
                          </FormControl>

                        )
                      }
                    </Field>
                    <Field name="email">
                      {
                        ({field,form})=>(
                          <FormControl
                            isInvalid={form.errors.email && form.touched.email}
                          >
                            <FormLabel>
                              Email
                            </FormLabel>
                            <Input
                                {...field}
                                id="email"
                                placeholder="Enter Your Email"
                              />
                            <FormErrorMessage  style={{margin:"14px 0"}}>{form.errors.email}</FormErrorMessage>
                          </FormControl>

                        )
                      }
                    </Field>
                    <Field name="password" >
                      {
                        ({field,form})=>(
                          <FormControl
                            isInvalid={form.errors.password && form.touched.password}
                          >
                            <FormLabel>
                              password
                            </FormLabel>
                              <InputGroup>
                                <Input
                                    {...field}
                                    id="password"
                                    placeholder="Enter Password"
                                    type={show?"text":"password"}
                                  />
                                  <InputRightElement width="4.5rem">
                                    <Button h="1.74rem" size="sm"
                                      onClick={handleClick}
                                      >{show?'hide':"show"}</Button>
                                  </InputRightElement>
                               </InputGroup>
                            <FormErrorMessage  style={{margin:"14px 0"}}>{form.errors.password}</FormErrorMessage>
                          </FormControl>

                        )
                      }
                    </Field>
                    <Field name="confirmPassword" >
                      {
                        ({field,form})=>(
                          <FormControl
                            isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}
                          >
                            <FormLabel>
                              confirmed Password
                            </FormLabel>
                            <InputGroup>
                            <Input
                                {...field}
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                type={show2?"text":"password"}

                              />
                              <InputRightElement width="4.5rem">
                                <Button h="1.74rem" size="sm"
                                  onClick={handleClick2}
                                  >{show2?'hide':"show"}</Button>
                              </InputRightElement>
                              </InputGroup>
                            <FormErrorMessage  style={{margin:"14px 0"}}>{form.errors.confirmPassword}</FormErrorMessage>
                          </FormControl>

                        )
                      }
                    </Field>
                    <FormControl id="pic">
                      <FormLabel>
                        Upload your Picture
                      </FormLabel>
                      <Input
                          type="file"
                          p={1.4}
                          accept="image/*"
                          onChange={e=>setPic(e.target.files[0])}
                        />
                    </FormControl>

                    <Button
                      type="submit"
                      colorScheme="blue"
                      isLoading={ formik.isSubmitting}
                      width="100%"
                      style={{marginTop:14}}
                      >Sign Up</Button>

                    </MyForm>



                )

              }
            }
          </Formik>



      </VStack>
    )
}

export default Signup
