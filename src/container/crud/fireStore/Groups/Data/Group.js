export class Group {
  constructor(name, city, elderIds, volunteersIds, id, joinDate, maxElders, maxVolunteers) {
    this.elderIds = elderIds;
    this.volunteersIds = volunteersIds;
    this.city = city;
    this.id = id;
    this.joinDate = joinDate;
    this.maxElders = maxElders;
    this.maxVolunteers = maxVolunteers;
    this.name = name;
  }

  //   toString() {
  //     return `${this.name}, ${this.state}, ${this.country}`;
  //   }
}

// Firestore data converter
export const groupConverter = {
  toFirestore(group) {
    return {
      elderIds: group.elderIds,
      volunteersIds: group.volunteersIds,
      city: group.city,
      id: group.id,
      joinDate: group.joinDate,
      maxElders: group.maxElders,
      maxVolunteers: group.maxVolunteers,
      name: group.name,
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new Group(
      data.name,
      data.city,
      data.elderIds,
      data.volunteersIds,
      data.id,
      data.joinDate,
      data.maxElders,
      data.maxVolunteers,
    );
  },
};

export const groupStatus = {
  Pending: 'Pending',
  Active: 'Active',
};
