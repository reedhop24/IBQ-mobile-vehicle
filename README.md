# IBQ-mobile-vehicle

#### This project was built using React Native, React Native Router, NodeJs, Express, MongoDb, and the Vehicle API by the National Highway Traffic Safety Administration. I built the core component PersVehScreen and it's child components VinLookup and VehLookup as well as the corresponding Back-End work for IBQ's mobile application, I then expanded the project to be it's own self contained app as a side/portfolio project.

#### On our mobile platform, the vehicle page serves to add vehicles to the existing quote. Therefore, the vehicle page has a VIN lookup, which checks the NHTSA's VIN API, as well as the ability to add vehicles with the Year Make Model standard. Anytime a vehicle is submitted to be added to the quote the information is validated against the NHTSA's Get Model by Year and Make API. Additionally there is the ability to delete vehicles. On the back end each quote is a Document in MongoDB with the vehicles as objects in an array. I also implemented a caching system with Redis, that is not much use within this self contained application because there is only one quote GET to receive the vehicles via the QuoteInfo. However in the full application where there is multiple GETs to receive the QuoteInfo the Redis Caching System comes in use there. Each time the customer navigates to the Garage Info a new array of vehicle objects is sent to the back end and updates the quote within the database. Also the corresponding object is deleted in the cache since it is no longer relevant. 

#### Since this is not fully comprehensive of the quoting experience in IBQ, I had to make this project self contained. So I added a "parent" component that would act as a search for Quote Numbers. Once a customer searches for a quote number, the back end is pinged and the array of vehicle objects is returned. I say "parent" in parenthesis as I did not want to have to refactor my code to properly maintain state at the parent level. Therefore, the QuoteSearch page is siloed from the rest of the application as it does not share it's state with the below elements rather it just adds the data returned from the DB to AsyncStorage(which we were using anyway for the display of quotes) and the PersVehScreen accesses AsyncStorage for that data. The CSS for this project was not done by me, thus was not copied over for this project and I did not want to spend much time on it, therefore the styling does not look great so don't judge me. 
