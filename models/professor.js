module.exports = (sequelize, DataTypes) => {
    const Professor = sequelize.define("Professor", {
        cpf: {
          type: DataTypes.STRING, 
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Professor;
  };
  