import { getBookingSlots, makeBooking } from '@/components/backendService';

global.fetch = jest.fn();

describe('backendService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBookingSlots', () => {
    it('returns slots on success', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({ status: 'success', data: ['18:00', '18:30'] }),
      });

      const result = await getBookingSlots('01/10/2025', 2);
      expect(result).toEqual(['18:00', '18:30']);
    });

    it('handles API error response', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({ status: 'error', message: 'No slots' }),
      });

      const result = await getBookingSlots('01/10/2025', 2);
      expect(result).toEqual(['No slots']);
    });

    it('handles fetch failure', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await getBookingSlots('01/10/2025', 2);
      expect(result).toEqual([]);
    });
  });

  describe('makeBooking', () => {
    it('returns booking on success', async () => {
      const mockBooking = { bookingNumber: '123', firstName: 'John' };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({ status: 'success', data: mockBooking }),
      });

      const result = await makeBooking('Mr.', 'John', 'Doe', '123', 'john@example.com', 2, '01/10/2025', '19:00', '');
      expect(result).toEqual(mockBooking);
    });

    it('throws on fetch error', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
      await expect(
        makeBooking('Mr.', 'John', 'Doe', '123', 'john@example.com', 2, '01/10/2025', '19:00', '')
      ).rejects.toThrow('Network error');
    });
  });
});
