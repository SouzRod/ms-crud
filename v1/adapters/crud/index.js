'use strict';

const crudWrapper = ({
  repository,
}) => {
  const get = async ({
    onSuccess,
    onError,
  }) => {
    try {
      const result = await repository.usersCollection.findOne({});

      return onSuccess(result);
    } catch (errorCatch) {
      return onError(errorCatch);
    }
  };
  return {
    get,
  };

};

module.exports = crudWrapper;
