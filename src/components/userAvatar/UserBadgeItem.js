import React from 'react'
import {Box} from "@chakra-ui/layout"
import {CloseIcon} from "@chakra-ui/icons"
import {useSelector} from "react-redux"


const UserBadgeItem = ({user,handleClick,isAdmin}) => {
    const loggedUser=useSelector(state=>state.authReducer.userAccountData.sendUser._id)

    return (
      <>

      <Box
        px={2}
        py={1}
        borderRadius="lg"
        m={1}
        mb={2}
        variant="solid"
        fontSize={12}
        backgroundColor="purple"
        color="white"
        cursor="pointer"
        onClick={handleClick}


      >
        {user.name}  {isAdmin===user._id?(<span>(Admin)</span>):null}

        {isAdmin && isAdmin===loggedUser && <CloseIcon pl={1}/>}
      </Box>
      </>
    )
}

export default UserBadgeItem
