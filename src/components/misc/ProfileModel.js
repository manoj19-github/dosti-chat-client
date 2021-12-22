import React from 'react'
import {IconButton}
from "@chakra-ui/button"
import {ViewIcon}
from "@chakra-ui/icons"


import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,Image,Text
} from '@chakra-ui/react'
import {useDisclosure} from "@chakra-ui/hooks"
const ProfileModel = ({user,children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
      {children?
      <span onClick={onOpen}>
        {children}
      </span>:(
      <IconButton
        d={{base:"flex"}}
        icon={<ViewIcon/>}
        onClick={onOpen}
      />
    )}
    <Modal size="lg"
      isOpen={isOpen}
      onClose={onClose}
      isCentered

    >
        <ModalOverlay />
        <ModalContent
          h="80vh"


        >
          <ModalHeader
            fontSize="40px"
            fontFamily="work sans"
            d="flex"
            justifyContent="center"
          >{user.name}</ModalHeader>
          <ModalCloseButton/>
          <ModalBody
            d="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
          >
            <Image
              borderRadius="full"
              boxSize="250px"
              src={user.pic}
              alt={user.name}
            />

            <Text
            m="6px 0"
              fontSize={{base:"28px",md:"30px",sm:"17px"}}
              fontFamily="Work sans"
            >
            Email: {user.email}
            </Text>

          </ModalBody>


        </ModalContent>
      </Modal>
      </>
    )
}

export default ProfileModel
