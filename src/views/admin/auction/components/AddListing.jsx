import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Grid,
  Switch,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import "./components.css";
import { useHistory } from "react-router-dom"


function AddListing() {
  const CATEGORIES = [
    "Electronics",
    "Antiques",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Toys",
    "Vehicles",
    "Other",
  ]

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [startPrice, setStartPrice] = useState(0)
  const [startDate, setStartDate] = useState(Date.now())
  const [startTime, setStartTime] = useState(Date.now())
  const [endDate, setEndDate] = useState(Date.now())
  const [endTime, setEndTime] = useState(Date.now())
  const [isListed, setIsListed] = useState(false)
  const [images, setImages] = useState([])
  const [imagesUrl, setImagesUrl] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useHistory()

  const handleChange = (setFunc, val) => {
    setFunc(val);
  }


  const handleUpload = async (files) => {
    let imageUrl = [];

    for (let file in files) {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "lup1iqul");
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/ddic7ju1q/image/upload`,
        {
          method: "POST",
          body: formData,
          headers: {}
        }
      );
      const file = await res.json();
      console.log(file);
      imageUrl.push(file.secure_url);
    }
    setImagesUrl(imageUrl);
    return true;
  }

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await handleUpload(images);
    const data = {
      title,
      description,
      category,
      startPrice,
      startDate,
      startTime,
      endDate,
      endTime,
      isListed,
      imagesUrl
    }
    // const res = await fetch("http://localhost:5000/api/auction/add", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // const result = await res.json();
    // console.log(result);
    setIsLoading(false);
    router.push("/admin/items")
    console.log("DONE!")
  }



  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {isLoading && <LoadingModal />}
      <Text fontSize="2xl" fontWeight="700">
        Add Item
      </Text>
      <br />
      <FormControl>
        <FormLabel htmlFor="title">First name</FormLabel>
        <Input id="title"
          onChange={(e) => {
            handleChange(setTitle, e.target.value)
          }}
          placeholder="title" borderRadius="16px" />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="description">First name</FormLabel>
        <Textarea
          onChange={(e) => {
            handleChange(setDescription, e.target.value)
          }}
          id="description"
          placeholder="description"
          borderRadius="16px"
          type="text"
          noOfLines={3}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="price">Starting Price</FormLabel>
        <Input
          id="price"
          onChange={(e) => {
            handleChange(setStartPrice, e.target.value)
          }}
          placeholder="price"
          borderRadius="16px"
          type="number"
        />
      </FormControl>
      <br />
      <Grid
        gridTemplateColumns={{ xl: "24% 23% 23% 24%" }}
        columnGap="2%"
      >
        <FormControl>
          <FormLabel htmlFor="startDate">Starting Date</FormLabel>
          <Input
            onChange={(e) => {
              handleChange(setStartDate, e.target.value)
            }}
            id="startDate"
            placeholder="startDate"
            borderRadius="16px"
            type="date"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="startTime">Starting Time</FormLabel>
          <Input
            onChange={(e) => {
              handleChange(setStartTime, e.target.value)
            }}
            id="startTime"
            placeholder="startTime"
            borderRadius="16px"
            type="time"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="endDate">End Date</FormLabel>
          <Input
            onChange={(e) => {
              handleChange(setEndDate, e.target.value)
            }}
            id="endDate"
            placeholder="endDate"
            borderRadius="16px"
            type="date"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="endTime">End Time</FormLabel>
          <Input
            id="endTime"
            onChange={(e) => {
              handleChange(setEndTime, e.target.value)
            }}
            placeholder="endTime"
            borderRadius="16px"
            type="time"
          />
        </FormControl>
      </Grid>
      <br />
      <Grid gridTemplateColumns={{ xl: "45% 50%" }} columnGap="5%">
        <FormControl>
          <FormLabel>Category</FormLabel>
          <Select placeholder='Select category'
            onChange={(e) => {
              handleChange(setCategory, e.target.value)
            }}
          >
            {CATEGORIES.map((item, ind) =>
              <option key={ind} value={item}>{item}</option>
            )}
          </Select>
        </FormControl>
        {category == "Other" && <FormControl>
          <FormLabel>Specify category</FormLabel>
          <Input
            id="images"
            onChange={(e) => {
            }}
            placeholder="Specify category"
            borderRadius="16px"
            type="text"
          />
        </FormControl>}
      </Grid>
      <FormControl>
        <FormLabel htmlFor="isListed">Is Listed</FormLabel>
        <Switch size="lg" placeholder="isListed"
          onChange={(e) => {
            handleChange(setIsListed, e.target.value)
          }} />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="images">Images</FormLabel>
        <Input
          id="images"
          onChange={(e) => {
            let flag = true;
            for (let i = 0; i < images.length; i++) {
              if (images[i].name == e.target.files[0]?.name) {
                flag = false;
                break;
              }
            }
            if (e.target.files[0]?.name && flag) {
              setImages([...images, e.target.files[0]])
            }
          }}
          placeholder="images"
          borderRadius="16px"
          type="file"
          alignItems="center"
          accept="image/*"
        />
        {images.map((item, ind) => {
          return (
            <SelectedImage key={ind} image={item} index={ind} setImage={setImages} />
          )
        })}
      </FormControl>
      <Button
        mt={4}
        colorScheme="brand"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
}


const SelectedImage = ({ image, index, setImage }) => {
  return (
    <Grid
      mt="0.3rem"
      gridTemplateColumns={{ sm: "90% 5%" }}
      columnGap="5%"
      width="fit-content"
      alignItems="center"
      border="1px solid #e2e8f0"
      borderRadius="16px 0 0 16px"
      p="0 1rem"
    >
      <Text>{image?.name}</Text>
      <Button
        onClick={() => {
          setImage((prev) => {
            return prev.filter((item, ind) => ind != index)
          })
        }}
      ><CloseIcon /></Button>
    </Grid>
  )
}


const LoadingModal = () => {
  return (
    <Modal
      isOpen={true}
      isCentered
      trapFocus={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Uploading</ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Spinner />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}


export default AddListing;