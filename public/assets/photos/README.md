# Satwika OS photo assets

The supplied original portrait is stored as `satwika-main.png`. It was copied
byte-for-byte from the provided `pixell_sat_4` file; the `.png` extension was
confirmed from its file signature. The gallery entries all reference this one
asset until individual photos are added.

Photo order and editable placeholder metadata are in
`src/config/photos.ts`. To add or replace an individual entry, copy its image
into this folder and change only that entry's `src`, `title`, `date`, `caption`,
or `description` in the config. Add an object to the `photoEntries` array to add
another gallery card; give it a unique `id` and place it where it should appear
in the array. Do not duplicate the image file for multiple entries.
