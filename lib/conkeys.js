const conkeys_base_url = process.env.CONKEYS_URL;

export const getKeys = async () => {
  return await fetch(`${conkeys_base_url}/api/keys`, {
    method: "GET",
  }).then((resp) => resp.json());
};
