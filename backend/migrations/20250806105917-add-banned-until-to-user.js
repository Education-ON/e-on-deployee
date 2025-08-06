'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(q, S) {
    await q.addColumn("User", "banned_until", { type: S.DATE, allowNull: true });
  },
  async down(q) {
    await q.removeColumn("User", "banned_until");
  },
};
