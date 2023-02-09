-- Insert the following new record to the client table: Tony, Stark, tony@starkent.com, Iam1ronM@n

INSERT INTO public.client (
    client_lastname,
    client_firstname,
    client_email,
    client_password
  )
VALUES   (
    'Tony',
    'Stark',
    'tony@starkent.com',
    'Iam1ronM@n'
  );



-- Modify the Tony Stark record to change the client_type to "Admin"

UPDATE client 
SET 
   client_type = 'Admin' 
WHERE 
   client_id = 1;




-- Delete the Tony Stark record from the database.

DELETE FROM 
   client 
WHERE 
   client_id = 1;




-- Modify the "GM Hummer" record to read "a huge interior" rather than "small interiors" using a single query.

UPDATE
  inventory
SET
   inv_description = REPLACE (
      inv_description,
      'small interiors',
      'a huge interior'
   )
WHERE
  inv_make = 'GM' AND inv_model = 'Hummer';



-- Use an inner join to select the make and model fields from the inventory table and the classification 
-- name field from the classification table for inventory items that belong to the "Sport" category.

SELECT
   i.inv_make,
   i.inv_model,
   c.classification_name
FROM
   inventory AS i
INNER JOIN
   classification AS c
ON 
   i.classification_id = c.classification_id
WHERE
   c.classification_name = 'Sport';



-- Update all records in the inventory table to add "/vehicles" to the middle of the file path in the 
-- inv_image and inv_thumbnail columns using a single query.

SELECT 
   overlay(
      inv_image placing '/vehicles' from 8 for 0
   ) AS inv_image,
   overlay(
      inv_thumbnail placing '/vehicles' from 8 for 0
   ) AS inv_thumbnail
FROM
   inventory;
