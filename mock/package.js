module.exports = [
  {
    url: '/admin/package/childOption*',
    type: 'get',
    response: config => {

      return {
        "code": 1,
        "msg": "success",
        "data": {
          "3": {
            "id": "3",
            "name": "包3",
            "pkgbnd": "package3"
          },
          "6": {
            "id": "6",
            "name": "包6",
            "pkgbnd": "package6"
          },
          "8": {
            "id": "8",
            "name": "包8",
            "pkgbnd": "package8"
          },
          "9": {
            "id": "9",
            "name": "包9",
            "pkgbnd": "package9"
          },
          "10": {
            "id": "10",
            "name": "包10",
            "pkgbnd": "package10"
          },
          "11": {
            "id": "11",
            "name": "包11",
            "pkgbnd": "package11"
          }
        }
      }
    }
  }
]
