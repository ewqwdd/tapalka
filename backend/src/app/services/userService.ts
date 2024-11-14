import { User } from "../entitties/User";
import { db } from "../utlis/postgres_connector";

interface CreatUserParams extends Omit<User, "id" | "referral"> {
  referralId?: number;
}

const REFS_TO_GET_BONUS = 1;
const REFERAL_BONUS = 50;

class UserService {
  async updateBalance(id: number, balanceChange: number): Promise<User | null> {
    const userRepository = db.getRepository(User);
    const foundUser = await userRepository.findOneBy({ id });
    if (!foundUser) return null;

    if (balanceChange < 0) {
      let amountToDeduct = Math.abs(balanceChange);

      // Сначала снимаем с bonusBalance
      if (foundUser.bonusBalance > 0) {
        if (amountToDeduct <= foundUser.bonusBalance) {
          foundUser.bonusBalance -= amountToDeduct;
          amountToDeduct = 0; // Все покрыто бонусным балансом
        } else {
          amountToDeduct -= foundUser.bonusBalance; // Часть покрытия бонусным балансом
          foundUser.bonusBalance = 0;
        }
      }

      // Если осталось что-то списать, снимаем с основного баланса
      if (amountToDeduct > 0) {
        foundUser.balance -= amountToDeduct;
      }
    } else {
      // Если balanceChange положительный, просто добавляем к основному балансу
      foundUser.balance += balanceChange;
    }

    await userRepository.update(
      { id },
      {
        balance: foundUser.balance,
        bonusBalance: foundUser.bonusBalance,
      }
    );

    return foundUser;
  }
  async createUser(user: CreatUserParams): Promise<User> {
    let referral;
    if (user.referralId) {
      referral = await db.getRepository(User).findOneBy({
        telegramId: user.referralId,
      });
    }
    const newUser = new User();
    newUser.telegramId = user.telegramId;
    newUser.balance = user.balance;
    newUser.country = user.country;
    newUser.ipAddress = user.ipAddress;
    newUser.isPremium = user.isPremium;
    newUser.lang = user.lang;
    newUser.name = user.name;
    newUser.invitedBy = referral ?? undefined;
    newUser.sourceId = user.sourceId;
    newUser.userAgent = user.userAgent;
    newUser.username = user.username;
    await db.manager.save(newUser);
    return newUser;
  }
  async updateUser(telegramId: number, user: Partial<User>): Promise<User | null> {
    const userRepository = db.getRepository(User);
    await userRepository.update({ telegramId }, user);
    const updUser = await userRepository.findOneBy({ telegramId });

    return updUser;
  }
  async findUser(telegramId: number) {
    const userRepository = db.getRepository(User);
    const foundUser = await userRepository.findOne({
      where: {
        telegramId,
      },
    });
    return foundUser;
  }
  async checkReferals(telegramId: number) {
    const userRepository = db.getRepository(User);
    const user = await userRepository.findOne({
      where: {
        telegramId,
      },
      relations: {
        referrals: true,
      },
    });
    if (!user) return;
    const refs = user?.referrals?.length ?? 0;
    console.log(refs);
    const amount = Math.floor(refs / REFS_TO_GET_BONUS) * REFERAL_BONUS;
    if ((user?.bonusBalance ?? 0) < amount) {
      await userRepository.update(
        {
          telegramId,
        },
        {
          bonusBalance: amount,
        }
      );
    }
  }
}

export const userService = new UserService();
