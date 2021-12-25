import React,{useState} from 'react'
import {useHistory} from "react-router-dom"
import * as Yup from  "yup"
import {Formik,Form as MyForm,Field} from "formik"
import {useDispatch,useSelector} from "react-redux"
import {loginAction} from "../../redux/action/authAction/loginAction"
import {
  VStack,
  Button
} from "@chakra-ui/react"

import {
  Input,InputGroup,
  InputRightElement,
}
from "@chakra-ui/input"

import {useToast} from "@chakra-ui/react"
import {
  FormControl,FormLabel,
  FormErrorMessage
}from "@chakra-ui/form-control"


const Login = () => {

  const toast=useToast()  // get the toast from chakra ui
  const dispatch=useDispatch()
  const history=useHistory()
  const userAccountData=useSelector(state=>state.authReducer.userAccountData)
  const userToken=useSelector(state=>state.authReducer.userToken)


  const initFormData={email:'',password:''}
  const validationSchema=Yup.object({
    email:Yup.string().trim().matches(/^[A-Za-z1-9_%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/i,"email not valid")
              .required("email is required"),

    password:Yup.string().trim().min(4,"minimum 4 character required")
              .max(20,"must be less than 20 character")
              .required("password required"),
  })

  const submitHandler=(values,onSubmitProps)=>{
    onSubmitProps.resetForm()
    try{
        dispatch(loginAction(values))   // network call

        if(userToken){
          toast({
            title:`${userAccountData.message}`,
            status:"success",
            duration:3000,
            isClosable:true,
            position:"bottom"
          })
          setTimeout(()=>{
            history.push("/chats") // move to chats page
          },3000)

        }else{
          toast({
            title:`${userAccountData.message}`,
            status:"error",
            duration:6000,
            isClosable:true,
            position:"bottom"
          })
        }

    }catch(err){
      console.log(`login error ${err}`)
    }
  }
  const [show,setShow]=useState(false)
  const [guestUser,setGuestUser]=useState(null)
  const handleGuestUser=()=>{
    setGuestUser({email:"guest@gmail.com",password:"guest"})
  }
    return (
      <VStack
        spacing="5px"
        align='stretch'
        color="black"
        >
          <Formik
            initialValues={guestUser||initFormData}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
            enableReinitialize

            >
            {
              formik=>{
                return(
                  <MyForm autoComplete="false">
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
                                autoComplete="false"
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
                                      onClick={()=>setShow(!show)}
                                      >{show?'hide':"show"}</Button>
                                  </InputRightElement>
                               </InputGroup>
                            <FormErrorMessage  style={{margin:"14px 0"}}>{form.errors.password}</FormErrorMessage>
                          </FormControl>

                        )
                      }
                    </Field>


                    <Button
                      type="submit"
                      colorScheme="blue"
                      width="100%"
                      isLoading={ formik.isSubmitting}
                      style={{marginTop:14}}
                      >Login  </Button>
                      <Button
                        type="button"
                        colorScheme="red"
                        width="100%"
                        onClick={handleGuestUser}
                        style={{marginTop:14}}
                        >Get Guest User Credential </Button>

                    </MyForm>
                )
              }
            }
          </Formik>

      </VStack>
    )
}
export default Login
