using Booking from '../db/data-model';


service CatalogService {
  entity Users @readonly as projection on Booking.Users;
}